import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/candidate/summary',
        destination: 'https://test-task-mock-api.onrender.com/api/candidate/summary',
      },
    ];
  },
};
