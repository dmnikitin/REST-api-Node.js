const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const addUser = user => usersRepo.addUser(user);

const updateUser = (id, update) => usersRepo.updateUser(id, update);

const deleteUser = async id => {
  const isSuccess = usersRepo.deleteUser(id);
  if (isSuccess) {
    const allTasks = await taskService.getAll();
    const userTasks = allTasks.filter(task => (task.userId = id));
    if (userTasks) {
      await Promise.all(
        userTasks.map(task => taskService.updateTask(task.id, { userId: null }))
      );
    }
  }
  return isSuccess;

  // try {
  //   const allTasks = await taskService.getAll();
  //   const userTasks = allTasks.filter(task => (task.userId = id));
  //   userTasks.forEach(async task => {
  //     try {
  //       await taskService.updateTask(task.id, { userId: null });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  //   usersRepo.deleteUser(id);
  // } catch (err) {
  //   console.log(err);
  // }
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
