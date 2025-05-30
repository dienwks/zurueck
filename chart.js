const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      const ctx = document.getElementById('barChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
            label: 'Sales',
            data: [120, 190, 300, 250, 320],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }
}).mount('#app');
