<template>
    <div class="item" v-bind:style="diffStyle">
        <div class="content">
            <i v-if="column.datatype === 'datetime'" class="calendar alternate icon"></i>
            <i v-else-if="column.datatype === 'email'" class="envelope icon"></i>
            <i v-else-if="column.datatype === 'integer'" class="hashtag icon"></i>
            <i v-else-if="column.datatype === 'money'" class="money icon"></i>
            <i v-else-if="column.datatype === 'string'" class="left quote icon"></i>
            <h4 class="ui header" style="margin-left: 5px">{{ column.friendly }}</h4>
            <button class="ui basic compact circular icon button" style="float:right" v-on:click="columnEditRoute(column._id)" >
                <i class="edit icon"></i>
            </button>
            <div class="meta">
                <span style="font-weight: bold">{{ column.datatype }}</span>
                <span class="cinema">{{ column.name }}</span>
            </div>
            <div class="description">
                <p>{{ column.description }}</p>
            </div>
            <div class="extra">
                <Tag v-for="flag in flags" :name="flag" />
            </div>
        </div>
    </div>
</template>

<script>
import Tag from '@/components/Tag.vue'

export default {
  name: 'ColumnContent',
  components: { Tag },
  props: ['column', 'flags', 'isMaster', 'masterColumns','tableName', 'tableId'],
  computed: {
    diffStyle() {
      if (!this.isMaster && this.tableId === this.column._tableId) {
        let copyCol= JSON.parse(JSON.stringify(this.column))
        delete copyCol._id
        delete copyCol._tableId
        delete copyCol.__v
        delete copyCol.aka
        delete copyCol.friendly
        delete copyCol.description
        delete copyCol.updated

        let colName = this.column.name
        let tblName = this.tableName
        if (this.masterColumns[tblName] !== undefined) {
          if (this.masterColumns[tblName][colName] !== undefined) {
              let masterCol = JSON.parse(
                JSON.stringify(this.masterColumns[tblName][colName]))
              if (JSON.stringify(copyCol) !== JSON.stringify(masterCol)) {
                return { "background-color": "#F6CECE" }
              }
          }
        }
      }
      return { "background-color": "none" }
    }
  },
  methods: {
    columnEditRoute: function(colId) {
      console.log("emitting column edit")
      this.$emit('edit-column', colId)
    },
  }
}
</script>
