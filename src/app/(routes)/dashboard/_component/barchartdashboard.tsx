import React from 'react'
import { Budget } from '@/lib/definitions'
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts'

export default function BarChartDashboard({ budgetList }: { budgetList: Budget[] }) {
    return (
        <div className='border rounded-2xl p-5'>
            <h2 className='font-bold text-lg'>Activity</h2>
            <ResponsiveContainer width={'80%'} height={300}>
                <BarChart data={budgetList} margin={{ top: 7 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalSpent" fill='#4845d2' stackId="a" />
                    <Bar dataKey="amount" fill='#c3c2ff' stackId="a" />
                </BarChart>
            </ResponsiveContainer>
        </div >
    )
}
