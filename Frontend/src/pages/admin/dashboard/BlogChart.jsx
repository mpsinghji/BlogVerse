import React, { useState, useEffect, useMemo } from "react";
import { formatDate } from "../../../utils/formatDate";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatData = (blogs, startDate, endDate) => {
  if (!startDate || !endDate) return [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) return [];

  const dateCountMap = {};
  const currentDate = new Date(start);

  while (currentDate <= end) {
    const dateStr = formatDate(currentDate);
    dateCountMap[dateStr] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  blogs.forEach((blog) => {
    const date = formatDate(blog.createdAt);
    if (dateCountMap[date] !== undefined) {
      dateCountMap[date]++;
    }
  });

  return Object.keys(dateCountMap)
    .map((date) => ({
      name: date,
      totalPosts: dateCountMap[date],
    }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));
};

const BlogChart = ({ blogs }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (blogs?.length) {
      const dates = blogs.map((blog) => new Date(blog.createdAt).getTime());
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));
      setStartDate(minDate.toISOString().split("T")[0]);
      setEndDate(maxDate.toISOString().split("T")[0]);
    }
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!startDate || !endDate || !blogs?.length) return [];
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);
    return blogs.filter((blog) => {
      const blogDate = new Date(blog.createdAt);
      return blogDate >= start && blogDate <= endDateObj;
    });
  }, [blogs, startDate, endDate]);

  const data = formatData(filteredBlogs, startDate, endDate);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Blog Post Trend</h2>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
      {data.length ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="totalPosts"
                stroke="#6A0DAD"
                strokeWidth={2}
                dot={{ fill: "#6A0DAD", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No blog data available for the selected range
        </p>
      )}
    </div>
  );
};

export default BlogChart;