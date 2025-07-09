-- Inserir configurações padrão
INSERT INTO public.settings (store_name, store_description, whatsapp_number, is_open) 
VALUES ('Espetinho do Sugano''s', 'Os melhores espetinhos da região! Feitos na hora com ingredientes frescos e tempero especial.', '5511999999999', true)
ON CONFLICT (id) DO NOTHING;

-- Inserir aparência padrão
INSERT INTO public.appearance (background_opacity, primary_color, secondary_color) 
VALUES (0.10, '#facc15', '#000000')
ON CONFLICT (id) DO NOTHING;

-- Inserir categorias padrão
INSERT INTO public.categories (name, description, display_order, is_active) VALUES
('Espetinhos', 'Deliciosos espetinhos grelhados na hora', 1, true),
('Pães', 'Pães de alho crocantes e saborosos', 2, true),
('Lanches', 'Lanches especiais da casa', 3, true),
('Bebidas', 'Bebidas geladas para acompanhar', 4, true),
('Refrigerantes', 'Refrigerantes diversos', 5, true),
('Cervejas', 'Cervejas geladas', 6, true)
ON CONFLICT (id) DO NOTHING;

-- Inserir produtos padrão
INSERT INTO public.products (category_id, name, description, price, image_url, is_available, stock_quantity, display_order) VALUES
-- Espetinhos
(1, 'Espetinho de Carne', 'Carne bovina temperada e grelhada na brasa', 8.00, '/placeholder.svg?height=200&width=300&text=Espetinho+de+Carne', true, 50, 1),
(1, 'Espetinho de Sobrecoxa', 'Sobrecoxa de frango suculenta e temperada', 7.00, '/placeholder.svg?height=200&width=300&text=Espetinho+de+Sobrecoxa', true, 45, 2),
(1, 'Espetinho de Coração', 'Coração de frango temperado com ervas', 6.50, '/placeholder.svg?height=200&width=300&text=Espetinho+de+Coração', true, 30, 3),
(1, 'Espetinho de Linguiça', 'Linguiça artesanal grelhada na brasa', 7.50, '/placeholder.svg?height=200&width=300&text=Espetinho+de+Linguiça', true, 40, 4),
(1, 'Espetinho Misto', 'Mix de carne, frango e linguiça', 9.00, '/placeholder.svg?height=200&width=300&text=Espetinho+Misto', true, 25, 5),

-- Pães
(2, 'Pão de Alho', 'Pão francês com manteiga de alho e ervas', 5.00, '/placeholder.svg?height=200&width=300&text=Pão+de+Alho', true, 20, 1),

-- Lanches
(3, 'Lanche Pão Francês', 'Lanche completo com carne, salada e molhos', 12.00, '/placeholder.svg?height=200&width=300&text=Lanche+Pão+Francês', true, 15, 1),
(3, 'Lanche Pão de Alho', 'Lanche especial no pão de alho crocante', 14.00, '/placeholder.svg?height=200&width=300&text=Lanche+Pão+de+Alho', true, 12, 2),

-- Bebidas
(4, 'Água Mineral', 'Água mineral gelada 500ml', 3.00, '/placeholder.svg?height=200&width=300&text=Água+Mineral', true, 100, 1),
(4, 'Suco Natural', 'Suco natural de frutas frescas', 6.00, '/placeholder.svg?height=200&width=300&text=Suco+Natural', true, 30, 2),

-- Refrigerantes
(5, 'Coca-Cola', 'Coca-Cola gelada 350ml', 5.00, '/placeholder.svg?height=200&width=300&text=Coca-Cola', true, 60, 1),
(5, 'Guaraná', 'Guaraná Antarctica gelado 350ml', 5.00, '/placeholder.svg?height=200&width=300&text=Guaraná', true, 55, 2),
(5, 'Fanta', 'Fanta Laranja gelada 350ml', 5.00, '/placeholder.svg?height=200&width=300&text=Fanta', true, 50, 3),

-- Cervejas
(6, 'Brahma', 'Brahma gelada 350ml', 6.00, '/placeholder.svg?height=200&width=300&text=Brahma', true, 40, 1),
(6, 'Skol', 'Skol gelada 350ml', 6.00, '/placeholder.svg?height=200&width=300&text=Skol', true, 35, 2),
(6, 'Heineken', 'Heineken gelada 350ml', 8.00, '/placeholder.svg?height=200&width=300&text=Heineken', true, 25, 3)
ON CONFLICT (id) DO NOTHING;
