import { randCatchPhrase, randVerb } from '@ngneat/falso';
import shuffle from 'lodash.shuffle';
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs';
import data from './data.json';
import { statuses } from '../lib/statuses';
import { nanoid } from 'nanoid';

const ApplicationSerializer = RestSerializer.extend({});

const heroes = data.users.map((hero) => {
  return {
    realName: hero.realName,
    alterEgo: hero.alterEgo,
  };
});

export const capitalize = (text) => {
  const first = text[0];
  return first.toUpperCase() + text.slice(1);
};

const getRandom = (collection) => shuffle(collection)[0];

export function makeServer({ environment = 'development' }) {
  return createServer({
    environment,

    serializers: {
      application: ApplicationSerializer.extend(),
      user: ApplicationSerializer.extend({}),
      task: ApplicationSerializer.extend({
        include: ['user'],
      }),
      column: ApplicationSerializer.extend({
        include: ['tasks'],
      }),
    },

    factories: {
      task: Factory.extend({
        title: () =>
          capitalize(`${randVerb()} ${randCatchPhrase().toLowerCase()}`),
      }),
    },

    models: {
      column: Model.extend({
        tasks: hasMany(),
      }),
      task: Model.extend({
        user: belongsTo(),
        column: belongsTo(),
      }),
      user: Model.extend({
        tasks: hasMany(),
      }),
    },

    routes() {
      this.timing = 2000;
      this.namespace = 'api';

      this.get('columns');
      this.get('tasks');
      this.get('users');

      this.del('tasks/:id');

      this.del('users/:id', (schema, request) => {
        const userId = request.params.id;
        const user = schema.users.find(userId);
        if (!user) {
          return new Response(404, {}, { message: 'User not found' });
        }
        console.log('User tasks:', user.tasks);
        // const tasks = user.tasks;
        // tasks.forEach((task) => {
        //   task.update({ user: null }); // Unlink user from tasks
        // });
        user.destroy(); // Delete the user
        return user;
      });

      this.put('tasks/:id');
      this.put('users/:id');

      this.post('tasks');

      this.post('/users', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.users.create({
          id: nanoid(),
          ...attrs,
        });
      });
    },

    seeds(server) {
      const users = heroes.map((hero) => server.create('user', { ...hero }));
      const columns = statuses.map((title) =>
        server.create('column', { title }),
      );
      server.createList('task', 50).forEach((task) => {
        const user = getRandom(users);
        const column = getRandom(columns);
        task.update({ user, column });
      });
    },
  });
}
