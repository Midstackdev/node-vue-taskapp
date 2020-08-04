<template>
    <div>
        <h1>Edit Task</h1>
        <form class="custom-form" @submit="onSubmit">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="task.title">
          </div>
          <div class="form-group">
            <label for="body">Body</label>
            <textarea type="text" class="form-control" id="body" v-model="task.body" cols="30" rows="10" placeholder="Purpose for task"></textarea>
          </div>
          <div class="form-group">
            <label for="title">Due Date</label>
            <input type="date" class="form-control" id="title" v-model="task.dueDate">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
    </div>
</template>


<script>
    import * as taskService from '../../services/TaskService'
    import moment from 'moment'

    export default {
        name: 'TaskEdit',
        data () {
            return {
                task: {
                    title: '',
                    body: '',
                    dueDate: '',
                }
            }
        },

        beforeRouteEnter(to, from, next) {
          taskService.getTaskById(to.params.id)
          .then(res => {
            if(res.status !== 200) {
              next('/tasks')
              return 
            }

            next(vm => {
              const task = res.data.data
              task.dueDate = moment(task.dueDate).format('YYYY-MM-DD')
              vm.task = task
            })
          })
        },

        methods: {
            async onSubmit (event) {
                event.preventDefault()
                const payload = {
                  task: this.task
                }
                await taskService.updateTask(payload)
                this.$router.push({ name: 'tasks-all' })
            }
        }
    }
</script>