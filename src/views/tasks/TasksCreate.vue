<template>
    <div>
        <h1>Create Task</h1>
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
            <button type="submit" class="btn btn-primary">Create Task</button>
          </div>
        </form>
    </div>
</template>


<script>
    import * as taskService from '../../services/TaskService'

    export default {
        name: 'TaskNew',
        data () {
            return {
                task: {
                    title: '',
                    body: '',
                    dueDate: '',
                }
            }
        },
        methods: {
            async onSubmit (event) {
                event.preventDefault()
                const payload = {
                  task: this.task
                }
                await taskService.createTask(payload)
                this.$router.push({ name: 'tasks-all' })
            }
        }
    }
</script>