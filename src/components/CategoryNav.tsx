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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-5 transition-colors border border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
              selectedCategory === category
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span>{category}</span>
            {categoryCounts && categoryCounts[category] !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 dark:bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-600'
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
