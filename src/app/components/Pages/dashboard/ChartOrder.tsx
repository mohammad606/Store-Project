"use client"
import { useEffect, useRef,useState } from 'react';
import Chart from 'chart.js/auto';
import {Output} from "@/services/module/Output";
import {Input} from "@/services/module/Input";


const BarChart = ({ orders }:{ orders :Output[] | Input[]}) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    const products = {};
    // @ts-ignore
    orders.forEach((entry:Output) => {
        entry.items.forEach((item, index) => {
            // @ts-ignore
            if (!products[item]) {
                // @ts-ignore
                products[item] = 0;
            }
            // @ts-ignore
            products[item] += entry.qtn[index] || 0;
        });
    });
    // @ts-ignore
    const productsArray :[{totalQtn:number,itemName:string}]= Object.entries(products).map(([itemName, totalQtn]) => ({
        itemName,
        totalQtn,
    }));
    const sortedProducts = productsArray.sort((a, b) => b.totalQtn - a.totalQtn);

    const topProducts :{totalQtn:number,itemName:string}[] = sortedProducts.slice(0, 15);
    const qtnArray :number[]= [];
    const itemArray :string[]= [];
    topProducts.forEach((e) => {
        qtnArray.push(e.totalQtn);
        itemArray.push(e.itemName);
    });



    useEffect(() => {
        if (!chartRef.current || !orders.length) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        const timeout = setTimeout(() => {
            const products: { [key: string]: number } = {};
            orders.forEach(order => {
                order.items.forEach((item, index) => {
                    if (products[item]) {
                        products[item] += order.qtn[index];
                    } else {
                        products[item] = order.qtn[index];
                    }
                });
            });
            // @ts-ignore
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const newChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: itemArray,
                        datasets: [{
                            label: 'الكمية المباعة',
                            data: qtnArray,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                setChartInstance(newChartInstance);
            }
        }, 0);

        return () => {
            clearTimeout(timeout);
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [orders]);

    return orders.length !=0 ? <canvas className={"!h-full !w-full"} ref={chartRef}/> :
        <div className={'w-[50vw] h-full flex justify-center items-center'}>
            <h2>No Data</h2>
        </div>
};

export default BarChart;