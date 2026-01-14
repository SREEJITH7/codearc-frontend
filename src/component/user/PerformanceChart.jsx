import { useEffect, useState } from "react";

export const PerformanceChart = ({
  currentRuntime,
  currentMemory,
  allSubmissions,
}) => {
  const [chartData, setChartData] = useState({ runtime: [], memory: [] });
  const [beatsPercentage, setBeatsPercentage] = useState({
    runtime: 0,
    memory: 0,
  });
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    if (!allSubmissions || allSubmissions.length === 0) return;

    const runtimeData = [];
    const memoryData = [];

    allSubmissions.forEach((submission) => {
      // Use direct metrics if available
      if (submission.runtime !== undefined && submission.memory !== undefined) {
        if (submission.runtime > 0) runtimeData.push(submission.runtime);
        if (submission.memory > 0) memoryData.push(submission.memory);
      } 
      // Fallback to calculating from testResults if metrics are missing
      else if (submission.testResults && submission.testResults.length > 0) {
        const avgRuntime =
          submission.testResults.reduce(
            (acc, test) => acc + (test.runtime || test.executionTime || 0),
            0
          ) / submission.testResults.length;

        const avgMemory =
          submission.testResults.reduce(
            (acc, test) => acc + (test.memoryUsed || 0),
            0
          ) / submission.testResults.length;

        if (avgRuntime > 0) runtimeData.push(avgRuntime);
        if (avgMemory > 0) memoryData.push(avgMemory);
      }
    });

    const sortedRuntime = [...runtimeData].sort((a, b) => a - b);
    const sortedMemory = [...memoryData].sort((a, b) => a - b);

    const runtimeBeats =
      sortedRuntime.length > 0
        ? (sortedRuntime.filter((t) => t > currentRuntime).length /
            sortedRuntime.length) *
          100
        : 0;

    const memoryBeats =
      sortedMemory.length > 0
        ? (sortedMemory.filter(
            (m) => m > currentMemory
          ).length /
            sortedMemory.length) *
          100
        : 0;

    setBeatsPercentage({
      runtime: Math.round(runtimeBeats * 100) / 100,
      memory: Math.round(memoryBeats * 100) / 100,
    });

    const createHistogramData = (data, current) => {
      if (!data || data.length === 0) return [];

      const validData = data.filter(
        (v) => typeof v === "number" && !isNaN(v) && isFinite(v)
      );
      if (validData.length === 0) return [];

      const min = Math.min(...validData);
      const max = Math.max(...validData);

      if (min === max) {
        return [
          {
            min,
            max,
            count: validData.length,
            isCurrent: true,
            percentage: 100,
          },
        ];
      }

      const bucketCount = Math.min(20, Math.max(8, validData.length));
      const bucketSize = (max - min) / bucketCount;
      if (bucketSize <= 0) return [];

      const buckets = Array(bucketCount)
        .fill(null)
        .map((_, i) => ({
          min: min + i * bucketSize,
          max: min + (i + 1) * bucketSize,
          count: 0,
          isCurrent: false,
          percentage: 0,
        }));

      validData.forEach((value) => {
        const index = Math.min(
          Math.floor((value - min) / bucketSize),
          bucketCount - 1
        );
        if (buckets[index]) buckets[index].count++;
      });

      buckets.forEach(
        (b) => (b.percentage = (b.count / validData.length) * 100)
      );

      const currentIndex = Math.min(
        Math.floor((current - min) / bucketSize),
        bucketCount - 1
      );
      if (buckets[currentIndex]) buckets[currentIndex].isCurrent = true;

      return buckets;
    };

    setChartData({
      runtime: createHistogramData(sortedRuntime, currentRuntime),
      memory: createHistogramData(
        sortedMemory,
        currentMemory
      ),
    });
  }, [allSubmissions, currentRuntime, currentMemory]);

  const PerformanceCard = ({
    title,
    value,
    unit,
    beats,
    icon,
    data,
    type,
    color,
  }) => {
    const maxCount = Math.max(...data.map((d) => d.count), 1);

    const getColor = (isCurrent, isHovered) => {
      if (color === "green") {
        if (isCurrent) return "bg-green-400";
        if (isHovered) return "bg-green-500";
        return "bg-green-600";
      }
      if (isCurrent) return "bg-blue-400";
      if (isHovered) return "bg-blue-500";
      return "bg-blue-600";
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-gray-400">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div>
            <span className="text-3xl font-bold text-white">
              {type === "runtime" ? Math.round(value) : value.toFixed(2)}
            </span>
            <span className="text-gray-400 ml-2">{unit}</span>
          </div>
          <div className="h-8 w-px bg-gray-600"></div>
          <div>
            <span className="text-gray-400">Beats </span>
            <span
              className={`font-bold ${
                beats >= 50 ? "text-green-400" : "text-orange-400"
              }`}
            >
              {beats.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-end h-32 gap-0.5">
          {data.map((bucket, index) => {
            const height = (bucket.count / maxCount) * 100;
            const isHovered =
              hoveredBar?.type === type && hoveredBar?.index === index;

            return (
              <div
                key={index}
                className="flex-1 flex items-end justify-center"
                onMouseEnter={() => setHoveredBar({ type, index })}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div
                  className={`w-full rounded-t transition-all ${getColor(
                    bucket.isCurrent,
                    isHovered
                  )}`}
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {allSubmissions && allSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceCard
            title="Runtime"
            value={currentRuntime}
            unit="ms"
            beats={beatsPercentage.runtime}
            data={chartData.runtime}
            type="runtime"
            color="blue"
            icon={<span>⏱️</span>}
          />
          <PerformanceCard
            title="Memory"
            value={currentMemory}
            unit="MB"
            beats={beatsPercentage.memory}
            data={chartData.memory}
            type="memory"
            color="green"
            icon={<span>💾</span>}
          />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center text-gray-400">
          No Performance Data
        </div>
      )}
    </div>
  );
};
