/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
// Have all controllers pass through the flash error handeler
  '*': 'flash',

  PostsController: {
    'create': 'authenticated',
    'delete': 'admin',
    'edit': ['flash', 'admin'],
    'toggle': 'admin',
    'update': 'admin',
    'add': ['flash', 'admin'],
  },
  UserController: {
    'delete': 'admin',
    'update': 'authenticated',
    'profile': 'userCheck',
  },
  SessionController: {

  }
};
