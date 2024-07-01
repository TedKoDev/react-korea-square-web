import React, { useState } from 'react'
import { devhistoryData } from '../../demoData/devhistory'

export default function DevHistory() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const historyData = devhistoryData

  const filteredData =
    selectedCategory === 'ALL'
      ? historyData
      : historyData.filter((item) => item.category === selectedCategory)

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Dev History</h2>
        <div className="mb-4">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 mr-2 rounded ${
              selectedCategory === 'ALL'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setSelectedCategory('F.E')}
            className={`px-4 py-2 mr-2 rounded ${
              selectedCategory === 'F.E'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Frontend
          </button>
          <button
            onClick={() => setSelectedCategory('B.E')}
            className={`px-4 py-2 rounded ${
              selectedCategory === 'B.E'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            Backend
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Task</th>
                <th className="py-2 px-4 border-b">Dev</th>
                <th className="py-2 px-4 border-b">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.date}</td>
                  <td className="py-2 px-4 border-b">{item.task}</td>
                  <td className="py-2 px-4 border-b">{item.worker}</td>
                  <td className="py-2 px-4 border-b">{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
