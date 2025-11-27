interface CategoryNavProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  categoryCounts?: Record<string, number>
}

export default function CategoryNav({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryNavProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/30 p-3 sm:p-4 transition-colors border border-gray-100 dark:border-gray-700">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-150 flex items-center gap-1.5 border ${
              selectedCategory === category
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500'
            }`}
          >
            <span>{category}</span>
            {categoryCounts && categoryCounts[category] !== undefined && (
              <span className={`text-xs min-w-[18px] text-center px-1 py-0.5 rounded transition-colors duration-150 ${
                selectedCategory === category
                  ? 'bg-white/25 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {categoryCounts[category]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
