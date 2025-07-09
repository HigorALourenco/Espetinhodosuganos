import type { Category, Product } from "@/types"
import ProductCard from "@/components/product-card"

interface CategorySectionProps {
  category: Category
  products: Product[]
}

export default function CategorySection({ category, products }: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-yellow-400 mb-2">{category.name}</h2>
        {category.description && <p className="text-gray-300">{category.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
