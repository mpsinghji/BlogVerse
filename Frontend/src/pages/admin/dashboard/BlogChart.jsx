import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatData = (blogs) => {
  if (!blogs?.length) return [];

  const categoryCountMap = {};

  blogs.forEach((blog) => {
    const category = blog.category || "Uncategorized";
    categoryCountMap[category] = (categoryCountMap[category] || 0) + 1;
  });

  return Object.entries(categoryCountMap)
    .map(([name, totalPosts]) => ({
      name,
      totalPosts,
    }))
    .sort((a, b) => b.totalPosts - a.totalPosts);
};

const BlogChart = ({ blogs }) => {
  const data = useMemo(() => formatData(blogs), [blogs]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Blog Posts by Category (All Time)</h2>
      {data.length ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
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
              <Bar
                dataKey="totalPosts"
                fill="#6A0DAD"
                name="Number of Posts"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No blog data available
        </p>
      )}
    </div>
  );
};

export default BlogChart;