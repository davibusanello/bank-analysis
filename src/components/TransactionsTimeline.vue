<template>
  <div class="container">
    <span class="title">Last 30 Transactions</span>
    <div v-if="data !== []">
      <ul id="transactions">
        <li v-for="transaction in transactions" :key="transaction.id">
          <span class="date">{{transaction.date}}</span>
          <span class="description">{{ transaction.description }}</span>
          <span class="amount">Amount: {{transaction.amount}}</span>
          <span v-if="transaction.dollar">Dollar: {{transaction.dollar}}</span>
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
export default {
  name: 'TransactionsTimeline',
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.transactions = Object.entries(this.transactions)
      .slice(0, 30)
      .map(item => item[1]);
  },
};
</script>

<style scoped>
span {
  padding: 5px;
}
</style>
