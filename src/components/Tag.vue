<template>
    <div v-if="name === 'isPK'" class="ui tiny yellow label" ><i class="hashtag icon" ></i>pk</div>
    <div v-else-if="name === 'isFK'" class="ui tiny olive label" ><i class="hashtag icon" ></i>fk</div>
    <div v-else-if="name === 'isSegment'" class="ui tiny teal label" ><i class="filter icon" ></i>filters</div>
    <div v-else-if="name === 'isMI'" class="ui tiny violet label" ><i class="chart bar icon" ></i>reports</div>
    <div v-else-if="name === 'isPII'" class="ui tiny pink label" ><i class="address card icon" ></i>PII</div>
    <div v-else-if="name === 'isSending'" class="ui tiny green label" ><i class="paper plane icon" ></i>Email</div>
    <div v-else-if="name === 'isPrune'" class="ui tiny red label" ><i class="cut icon" ></i>Prune</div>
</template>

<script>
export default {
  name: 'Tag',
  props: ['name'],
  data() {
    return {
      color: "blue",
      icon: "hashtag icon",
      mapping: {
          "isFK": { "label": "pk", "icon": "hashtag", "color":"yellow" },
          "isMI": { "label": "pk", "icon": "chart line", "color":"olive" },
          "isPII": { "label": "pk", "icon": "adress card", "color":"teal" },
          "isPK": { "label": "pk", "icon": "hashtag", "color":"violet" },
          "isSegment": { "label": "pk", "icon": "filter", "color":"pink" },
      }
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
