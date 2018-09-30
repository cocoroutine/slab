<template>
    <div class="ui pusher" >
        <form class="ui form" style="min-width: 480px" v-on:submit.prevent="save">
            <div class="two fields">
                <div class="field">
                    <label>Friendly Name</label>
                    <input type="text" name="friendly-name" placeholder="Friendly Name" v-model="etable.friendly">
                </div>
                <div class="field">
                    <label>Name</label>
                    <input type="text" name="backend-name" placeholder="Name" v-model="etable.name">
                </div>
            </div>
            <div class="field">
                <label>Description</label>
                <textarea rows="3" v-model="etable.description" ></textarea>
            </div>
            <div class="field">
                <label>Table Joins</label>
                <select id="joinselect" v-model="etable.joins" class="ui dropdown" multiple >
                    <option v-for="join in filteredJoins" v-bind:selected="etable.joins.includes(join._id)"
                    v-bind:value="join._id" :key="join._id" >{{ join.friendly }}</option>
                </select>
            </div>
            <div class="inline fields">
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="sending" v-model="etable.isSending" >
                        <label>Email</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="prune" v-model="etable.isPrune" >
                        <label>Prune</label>
                    </div>
                </div>
            </div>

            <button class="ui right floated button" v-on:click.prevent="cancel" >Cancel</button>
            <button class="ui right floated positive button" type="submit" >Save</button>
      
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditTableContent',
  props: ['table', 'tableList'],
  data() {
    return {
      etable: { _id: "", friendly: "", name: "", description: "", joins: [] },
    }
  },
  created() {
    console.log("creating ET")
    this.etable = Object.assign({}, this.table)
    this.flatten_joins()
  },
  mounted() {
    $('#joinselect').dropdown();
  },
  computed: {
    filteredJoins: function() {
      return this.tableList.filter( join => join._id !== this.table._id )
    }
  },
  methods: {
    flatten_joins: function() {
      let flatJoins = Array.from(
        this.etable.joins,
        function(join) { return join._id })
      this.etable.joins = flatJoins
    },
    cancel: function() {
      this.$emit('returnto-table')
    },
    save: async function(evt) {
      try {
        //check joins
        evt.preventDefault()
        const response = await axios.put(
          this.$apihost + '/table/'+ this.table._id, this.etable)
        this.$emit('navto-table', this.table._id)
      } catch (err) {
        console.log(err)
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.field {
      margin: 15px 0px !important;
  }
</style>
