<template>
    <div class="ui pusher" >
        <form class="ui form" style="min-width: 480px" v-on:submit.prevent="save">
            <div class="two fields">
                <div class="field">
                    <label>Friendly Name</label>
                    <input type="text" name="friendly-name" placeholder="Friendly Name" v-model="column.friendly">
                </div>
                <div class="field">
                    <label>Name</label>
                    <input type="text" name="backend-name" placeholder="Name" v-model="column.name">
                </div>
            </div>
            <div class="field">
                <label>Description</label>
                <textarea rows="3" v-model="column.description" ></textarea>
            </div>
            <div class="field">
                <label>Data Type</label>
                <select id="selectdatatype" class="ui dropdown" v-model="column.datatype" >
                    <option value="string" >String</option>
                    <option value="datetime" >Datetime</option>
                    <option value="email" >Email</option>
                    <option value="integer" >Integer</option>
                    <option value="money" >Money</option>
                </select>
            </div>
            <div class="inline fields">
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="isPK" v-model="column.isPK" >
                        <label>PK</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="isFK" v-model="column.isFK" >
                        <label>FK</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="isSegment" v-model="column.isSegment" >
                        <label>Filters</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="isMI" v-model="column.isMI" >
                        <label>Reports</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui toggle checkbox">
                        <input type="checkbox" name="isPII" v-model="column.isPII" >
                        <label>PII</label>
                    </div>
                </div>
            </div>
            <button class="ui right floated button" v-on:click.prevent="cancel" >Cancel</button>
            <button class="ui right floated negative button" v-on:click.prevent="destroy" >Delete</button>
            <button class="ui right floated positive button" type="submit" >Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditColumnContent',
  props: ['columnId'],
  data() {
    return {
      column: { _id: "", description: "", friendly: "", name: "", datatype: "",
        isPK: false, isFK: false, isSegment: false, isMI: false, isPII: false },
    }
  },
  created() {
    console.log("creating EC")
    this.columnRead(this.columnId)
  },
  updated() {
    $('#selectdatatype').dropdown()
  },
  methods: {
    columnRead: async function(colId) {
      try {
        const response = await axios.get(this.$apihost + '/column/'+ colId)
        this.column = response.data
        this.$emit('read-table', this.column._tableId)
      } catch (err) {
        console.log(err)
      }
    },
    cancel: function() {
      this.$emit('returnto-table')
    },
    destroy: async function(evt) {
      try {
        evt.preventDefault()
        const response = await axios.delete(
          this.$apihost + '/column/'+ this.column._id)
        this.$emit('returnto-table')
      } catch (err) {
        console.log(err)
      }
    },
    save: async function(evt) {
      try {
        evt.preventDefault()
        const response = await axios.put(
          this.$apihost + '/column/'+ this.column._id, this.column)
        this.$emit('navto-table', this.column._tableId)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.field {
      margin: 15px 0px !important;
  }
</style>
