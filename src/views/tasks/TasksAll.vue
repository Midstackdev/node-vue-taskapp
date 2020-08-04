<template>
   <div class="d-flex flex-column">
        <h1>Show All Task</h1>

        <div class="mb-4">
             <router-link to="/tasks/new" class="btn btn-success ml-2" exact>Create Task</router-link>
        </div>
        
        <div v-if="tasks && tasks.length" class="d-flex flex-wrap justify-content-start">
            <div v-for="task in tasks" :key="task._id" class="card mb-2 ml-2 text-white bg-dark" style="width: 18rem;">
              <div class="card-body">

                <div class="d-flex justify-content-between">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <span :class="{ 'late' : taskIsLate(task.dueDate) && !task.completed }" class="small">{{ task.dueDate | date }}</span>
                </div>

                <h6 class="card-subtitle mb-2 text-muted">
                    Created by {{ task.author.username }}
                </h6>

                <p class="card-text">{{ task.body }}</p>
                
                <div v-if="task.author._id === $store.state.userId" class="form-group form-check">
                    <input type="checkbox" 
                    class="form-check-input"
                    :disabled="task.completed" 
                    v-model="task.completed" 
                    @click="markAsCompleted(task)"
                    />
                    <label for="form-check-label">Completed</label>
                </div>

                <div v-if="task.author._id === $store.state.userId" class="d-flex justify-content-between">
                    <router-link 
                        :to="{ name: 'tasks-edit', params: {id: task._id}}" 
                        type="button" 
                        class="card-link btn btn-primary"
                        >Edit</router-link>
                    <a href="#" 
                        @click.prevent="clearTask(task._id)" 
                        class="card-link btn btn-danger"
                        >Delete</a>
                </div>
              </div>
            </div>
        </div>

        <div v-if="tasks && tasks.length === 0" class="ml-2">
            <div class="alert alert-info">No tasks found.</div>
        </div>

        <modal name="confrim-modal" classes="bg-dark">
            <div class="card border-dark mb-3 bg-dark" style="max-width: auto;">
              <div class="card-header">Delete confirmation</div>
              <div class="card-body text-dark">
                <h5 class="card-title">Confirm delete task</h5>
                <p class="card-text">Are you sure you would like to delete this task?</p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" @click.prevent="cancelModal">Cancel</button>
                <button type="button" class="btn btn-danger" @click.prevent="deleteTask">Delete</button>
              </div>
            </div>
        </modal>

   </div>
</template>


<script>
    import * as taskService from '../../services/TaskService'
    import moment from 'moment'

    export default {
        name: 'TaskAll',
        data () {
            return {
                tasks: null,
                currentTaskId: null
            }
        },

        watch: {
            // currentTaskId(val) {
            //     console.log(val)
            // }
        },

        methods: {
            taskIsLate (date) {
                return moment(date).isBefore
            },

            markAsCompleted (task) {
                task.completed = true
                const request = {
                    task
                }
                taskService.updateTask(request)
            },

            clearTask(taskId) {
                this.$modal.show('confrim-modal')
                this.currentTaskId = taskId
            },

            cancelModal () {
                this.$modal.hide('confrim-modal')
                this.currentTaskId = null
            },

            async deleteTask () {
                this.$modal.hide('confrim-modal')
                await taskService.deleteTask(this.currentTaskId)
                this.tasks = this.tasks.filter((i) => i._id != this.currentTaskId)
                this.currentTaskId = null
            }
        },

        beforeRouteEnter(to, from, next) {
            taskService.getAllTasks()
            .then(res => {
                
                next(vm => {
                    vm.tasks = res.data.data
                })
            })
        }
    }
</script>