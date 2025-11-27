import { Guide } from '@/types/guide'

interface GuideCardProps {
  guide: Guide
  onClick: () => void
}

export default function GuideCard({ guide, onClick }: GuideCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/80 transition-all duration-300 cursor-pointer overflow-hidden group relative transform hover:-translate-y-3 hover:scale-[1.02] border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 dark:from-blue-900/0 dark:to-cyan-900/0 group-hover:from-blue-50/30 group-hover:to-cyan-50/30 dark:group-hover:from-blue-900/20 dark:group-hover:to-cyan-900/20 transition-all duration-300 pointer-events-none" />
      
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {guide.title}
          </h3>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full whitespace-nowrap ml-2">
            {guide.category}
          </span>
        </div>
        
        {guide.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {guide.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            {guide.location && (
              <span className="flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {guide.location}
              </span>
            )}
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-all inline-flex items-center gap-1 group-hover:gap-2">
            阅读
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
