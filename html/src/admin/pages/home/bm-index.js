function addCommas(nStr) {
	nStr += '';
	const x = nStr.split('.');
	const x1 = x[0];
	const x2 = x.length > 1 ? '.' + x[1] : '';
	const rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function chartInit(canvas, config) {
	const ctx = document.getElementById(canvas);
	if (!ctx) {
		return; // Ngừng thực hiện nếu không có canvas
	}

	if (!config) {
		config = {
			chart: {
				totalSum: 8,
				dataValues: [6, 1, 1],
				labels: ["Chưa liên hệ", "Chưa nghe máy", "Đã liên hệ"],
				backgroundColor: ["#E03137", "#E6BB20", "#0CAF60"],
			}
		};
	}

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: [
				"6-10",
				"7-10",
				"8-10",
				"9-10",
				"10-10",
				"11-10",
				"12-10",
				"13-10",
				"14-10",
				"15-10",
				"16-10",
				"17-10",
				"18-10",
				"19-10",
				"20-10",
				"21-10",
				"22-10",
				"23-10",
				"24-10",
				"25-10",
				"26-10",
				"27-10",
				"28-10",
				"29-10",
				"30-10",
				"31-10",
				"1-11",
				"2-11",
				"3-11"
			],
			datasets: [{
				data: [
					0,
					0,
					9,
					34,
					108,
					170,
					160,
					151,
					257,
					254,
					217,
					228,
					252,
					227,
					195,
					185,
					263,
					328,
					316,
					370,
					285,
					244,
					201,
					196,
					185,
					277,
					258,
					161,
					27
				],
				fill: false,
				borderWidth: 2,
				tension: 0,
				label: 'Khách',
				borderColor: 'rgba(0,156,226,1)',
			}, {
				data: [65, 59, 80, 81, 56, 55, 40],
				fill: false,
				borderWidth: 2,
				tension: 0,
				label: 'Lược truy cập',
				borderColor: 'rgba(255,111,3,1)',
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: true,
					text: 'Số lượng thống kê người truy cập'
				},
				tooltip: {
					callbacks: {
						label: function(tooltipItem) {
							const label = tooltipItem.dataset.label || '';
							const value = addCommas(tooltipItem.raw);
							return label + ': ' + value;
						}
					},
				}
			},
			interaction: {
				mode: 'index',
				intersect: false
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Ngày'
					}
				},
				y: {
					stacked: true,
					title: {
						display: true,
						text: 'Lượt truy cập',
					},
					ticks: {
						callback: function(value) {
							return addCommas(value);
						}
					}
				}
			}
		}
	});

	window.addEventListener('beforeprint', () => {
		myChart.resize(600, 600);
	});
	window.addEventListener('afterprint', () => {
		myChart.resize();
	});
}

chartInit('areaChartHits');