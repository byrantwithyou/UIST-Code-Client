<template>
  <div>
    <GChart :options="option" :data="data" type="PieChart"></GChart>
  </div>
</template>

<script>
  export default ({
    data: () => ({ 
      data: [["", ""], ["right", 50], ["wrong", 50]],
      option: {
        title: "dsf",
        height: 100,
        width: 100
      }
    })
  })
</script>