// 1. 配色方案
const colors = {
    darkBlue: "#001524",
    teal: "#15616d",
    cream: "#ffecd1",
    orange: "#ff7d00",
    brown: "#78290f"
};

// 2. 热力图数据
const heatmapData = {
    z: [
        [15, 20, 5, 8, 12, 0, 0, 0],
        [8, 12, 6, 10, 15, 0, 0, 0],
        [5, 15, 10, 7, 8, 0, 0, 0],
        [0, 0, 0, 0, 0, 25, 18, 5],
        [0, 0, 0, 0, 0, 15, 22, 8],
        [10, 5, 12, 8, 6, 0, 0, 0],
        [0, 0, 0, 0, 0, 20, 25, 10],
        [3, 7, 10, 12, 8, 0, 0, 0]
    ],
    x: ['头面部', '颈部', '胸部', '腹部', '腰背部', '上肢', '下肢', '会阴部'],
    y: [
        '手太阴肺经', '手阳明大肠经', '足阳明胃经', 
        '足太阴脾经', '手少阴心经', '手太阳小肠经',
        '足太阳膀胱经', '手厥阴心包经'
    ]
};

// 3. 创建热力图函数（修复版）
function createHeatmapChart(containerId = 'heatmap-chart') {
    // 准备文本数据（确保数字显示）
    const textData = heatmapData.z.map(row => 
        row.map(val => val > 0 ? val.toString() : '')
    );

    // 核心数据配置
    const data = [{
        type: 'heatmap',
        z: heatmapData.z,
        x: heatmapData.x,
        y: heatmapData.y,
        text: textData,
        hoverinfo: 'x+y+z',
        hovertemplate: `
            <b>经络</b>: %{y}<br>
            <b>部位</b>: %{x}<br>
            <b>穴位数</b>: %{z}
            <extra></extra>
        `,
        colorscale: [
            [0, colors.teal],
            [0.5, colors.orange],
            [1, colors.brown]
        ],
        showscale: true,
        colorbar: {
            title: '穴位数量(个)',
            titlefont: {
                color: colors.cream,
                family: 'Noto Sans SC'
            },
            tickfont: {
                color: colors.cream,
                family: 'Noto Sans SC'
            }
        },
        // 关键修复1：确保数字显示
        text: textData,
        texttemplate: '%{text}',
        textfont: {
            family: 'Noto Sans SC',
            size: 12,
            color: colors.cream,
            weight: 'bold'
        },
        // 关键修复2：网格线增强
        xgap: 1,
        ygap: 1,
        zsmooth: 'best'
    }];

    // 布局配置
    const layout = {
        title: {
            text: '经络穴位人体分布热力图',
            font: {
                family: 'Noto Sans SC',
                size: 24,
                color: colors.cream
            }
        },
        xaxis: {
            tickangle: -45,
            tickfont: {
                color: colors.cream,
                family: 'Noto Sans SC',
                size: 12
            },
            title: {
                text: '人体部位',
                font: {
                    color: colors.cream,
                    family: 'Noto Sans SC',
                    size: 14
                }
            },
            // 关键修复3：网格线显示
            showgrid: true,
            gridcolor: 'rgba(255, 236, 209, 0.3)',
            gridwidth: 1,
            linecolor: colors.cream
        },
        yaxis: {
            tickfont: {
                color: colors.cream,
                family: 'Noto Sans SC',
                size: 12
            },
            title: {
                text: '经络名称',
                font: {
                    color: colors.cream,
                    family: 'Noto Sans SC',
                    size: 14
                }
            },
            // 关键修复4：网格线显示
            showgrid: true,
            gridcolor: 'rgba(255, 236, 209, 0.3)',
            gridwidth: 1,
            linecolor: colors.cream
        },
        paper_bgcolor: colors.darkBlue,
        plot_bgcolor: colors.darkBlue,
        margin: {
            t: 100,
            l: 200,
            r: 50,
            b: 150
        }
    };

    // 关键修复5：自定义网格线
    layout.shapes = [];
    // 水平网格线
    for (let i = 0; i < heatmapData.y.length - 1; i++) {
        layout.shapes.push({
            type: 'line',
            x0: -0.5,
            y0: i + 0.5,
            x1: heatmapData.x.length - 0.5,
            y1: i + 0.5,
            line: {
                color: 'rgba(255, 236, 209, 0.5)',
                width: 1,
                dash: 'dot'
            }
        });
    }
    // 垂直网格线
    for (let i = 0; i < heatmapData.x.length - 1; i++) {
        layout.shapes.push({
            type: 'line',
            x0: i + 0.5,
            y0: -0.5,
            x1: i + 0.5,
            y1: heatmapData.y.length - 0.5,
            line: {
                color: 'rgba(255, 236, 209, 0.5)',
                width: 1,
                dash: 'dot'
            }
        });
    }

    // 渲染图表
    Plotly.newPlot(containerId, data, layout);
}

// 4. 使用说明
// 在HTML中只需保留容器元素和Plotly.js引用：
// <div id="heatmap-chart"></div>
// <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
// 然后调用：
// document.addEventListener('DOMContentLoaded', createHeatmapChart);
// JavaScript Document