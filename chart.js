// Define the range() function
function range(start, stop, step) {
  const result = [];
  for (let i = start; i < stop; i += step) {
    result.push(i);
  }
  return result;
}

function generateMonthLabels(startDateStr, numberOfMonths) {
  const start = new Date(startDateStr);
  const labels = [];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const current = new Date(start);

  for (let i = 0; i < numberOfMonths; i++) {
    const month = monthNames[current.getMonth()];
    const year = current.getFullYear();
    labels.push(`${month} ${year}`);

    // Move to the next month
    current.setMonth(current.getMonth() + 1);
  }

  return labels;
}

// Vue app + Chart.js logic
const { createApp, onMounted } = Vue;

createApp({
  setup() {
    onMounted(() => {
      const ctx = document.getElementById('barChart').getContext('2d');

      const dataValues50 = range(50, 200, 50);
      const labelValues50 = generateMonthLabels("2025-03-01", dataValues50.length);
    
      const dataValues120 = range(270, 20000, 120);
      const labelValues120 = generateMonthLabels("2025-06-01", dataValues120.length);

      const dataValues = [...dataValues50, ...dataValues120];
      const labelValues = [...labelValues50, ...labelValues120];

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelValues,
          datasets: [{
            label: 'Gezahlt',
            data: dataValues,
            borderWidth: 1,
            borderColor: 'rgb(201, 76, 4)',
            fill: true,
            backgroundColor: 'rgba(201, 76, 4, 0.2)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
                    }
                }
            }
          },
          plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                label: function(context) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
                    return `${label}: ${value}`;
                }
              }
            }
          }
        }
      });
    });
  }
}).mount('#app');
