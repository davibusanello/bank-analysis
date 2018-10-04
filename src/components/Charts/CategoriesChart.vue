<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(
      {
        labels: this.getCategoriesName(this.data),
        datasets: [
          {
            label: 'R$',
            backgroundColor: this.getRandonColors(this.data),
            data: this.getValues(this.data),
            fillColor: this.dynamicColors,
            strokeColor: this.dynamicColors,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: this.getRandonColors(this.data),
          },
        ],
      },
      {
        scales: {
          xAxes: [{
            ticks: {
              fontColor: 'blueviolet',
              fontStyle: 'bold',
              stepSize: 1,
              beginAtZero: true,
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: 'red',
              beginAtZero: true,
            },
          }],
        },
      },
    );
  },
  methods: {
    getCategoriesName(categories) {
      const names = [];
      categories.forEach((category) => {
        names.push(category.name);
      });
      return names;
    },
    getValues(categories) {
      const values = [];
      categories.forEach((category) => {
        values.push(this.normalizeValue(category.value));
      });
      return values;
    },
    normalizeValue(valueString) {
      let value = valueString.replace('R$ ', '');
      value = value.replace('.', '');
      value = value.replace(',', '.');
      return value;
    },
    dynamicColors() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    },
    getRandonColors(categories) {
      const colors = [];
      categories.forEach(() => {
        colors.push(this.dynamicColors());
      });
      return colors;
    },
  },
};
</script>
