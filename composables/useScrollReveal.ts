export function useScrollReveal(options?: IntersectionObserverInit) {
  const observe = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  }

  onMounted(() => observe())
}
