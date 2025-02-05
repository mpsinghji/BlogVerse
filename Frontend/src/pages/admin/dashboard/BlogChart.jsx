import React from "react";
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

// Format blog data for the chart
const formatData = (blogs) => {
  // Group blogs by date and count posts per date
  const dateCountMap = blogs.reduce((acc, blog) => {
    const date = formatDate(blog.createdAt);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(dateCountMap).map((date) => ({
    name: date,
    totalPosts: dateCountMap[date],
  }));
};

const BlogChart = ({ blogs }) => {
  const data = formatData(blogs);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Blog Post Trend</h2>
      {data.length ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalPosts"
                stroke="#6A0DAD"
                fill="#6A0DAD"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500">No blog data available.</p>
      )}
    </div>
  );
};

export default BlogChart;
