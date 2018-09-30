<template>
    <div class="ui visible left inverted vertical sidebar menu">
        <div class="item header">Slabs</div>
        <div id="slabsdropdown" class="ui inverted floating selection dropdown item" >
            <input type="hidden" ref="sslab" name="sslab" value="" v-on:change="selectSlab">
            <i class="dropdown icon"></i>
            <div class="default text">{{ slab.name }}</div>
            <div class="menu"  >
                <div v-for="slabItem in slabList" class="item" :data-value="slabItem._id" >{{ slabItem.name }}</div>
                <div class="divider"></div>
                <div class="ui icon input" style="overflow: visible;">
                    <input type="text" ref="islab" name="islab" placeholder="slab name...">
                    <i class="small circular plus link icon" style="top: .5em;" v-on:click="addSlab" ></i>
                </div>
            </div>
        </div>
        <div class="item header">Tables<i class="plus circle icon link" v-on:click="showInput"></i></div>
        <div class="menu">
        <a class="item" v-for="tableItem in tableList" v-bind:class="{ active: tableItem._id == table._id}"
            v-on:click="selectTable(tableItem._id)"  >{{ tableItem.friendly }}</a>
        <div class="item transition hidden" id="addtable" >
            <div class="ui small input" >
                <input ref="itable" name="itable" placeholder="table name..." type="text" v-on:blur="addTable">
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sidebar',
  props: ['slab', 'table', 'tableList'],
  data() {
    return {
      slabList: null,
    }
  },
  created() {
    console.log("creating SB")
    this.listSlabs()
  },
  mounted() {
      $('#slabsdropdown').dropdown()
  },
  methods: {
    addSlab: function() {
      if(this.$refs.islab.value) {
        this.slabCreate(this.$refs.islab.value)
        this.$refs.islab.value = ""
      }
    },
    addTable: function() {
      $('#addtable').transition('fade out')
      if(this.$refs.itable.value) {
        this.tableCreate(this.$refs.itable.value)
      }
    },
    listSlabs: async function() {
      try {
        const response = await axios.get(this.$apihost + '/slab')
        this.slabList = response.data
      } catch (err) {
        console.log(err)
      }
    },
    selectSlab: function() {
      if(this.$refs.sslab.value) {
        this.$emit('navto-slab', this.$refs.sslab.value)
      }
    },
    selectTable: function(tableId) {
      this.$emit('navto-table', tableId, this.slab)
    },
    showInput: function() {
      this.$refs.itable.value = ""
      $('#addtable').transition('fade in')
      this.$refs.itable.focus()
    },
    slabCreate: async function(name) {
      try {
        const payload = { "name": name }
        const response = await axios.post(this.$apihost + '/slab', payload)
        await this.listSlabs()
        const sslab = response.data
        this.$emit('navto-slab', sslab._id)
      } catch (err) {
        this.errors.push(err)
      }
    },
    tableCreate: async function(name) {
      try {
        const dbname = name.toLowerCase() + "_tbl"
        const payload = { "friendly": name, "name": dbname, "_slabId": this.slab._id };
        const response = await axios.post(this.$apihost + '/table', payload)
        let ttable = response.data
        this.$emit('navto-table', ttable._id)
      } catch (err) {
        this.errors.push(err)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ui.sidebar {
    width: 260px;
    float: left;
    overflow: visible !important;
}
</style>
