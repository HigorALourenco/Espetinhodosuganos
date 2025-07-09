-- Inserir produtos padrão
INSERT INTO products (category_id, name, description, price, display_order) VALUES
-- Espetinhos
(1, 'Espetinho de Carne', 'Carne bovina temperada e grelhada', 8.00, 1),
(1, 'Espetinho de Sobrecoxa', 'Sobrecoxa de frango suculenta', 7.00, 2),
(1, 'Espetinho de Coração', 'Coração de frango temperado', 6.50, 3),
(1, 'Espetinho de Linguiça', 'Linguiça artesanal grelhada', 7.50, 4),
(1, 'Espetinho Misto', 'Mix de carne, frango e linguiça', 9.00, 5),

-- Pães
(2, 'Pão de Alho', 'Pão francês com manteiga de alho', 5.00, 1),

-- Lanches
(3, 'Lanche Pão Francês', 'Lanche completo no pão francês', 12.00, 1),
(3, 'Lanche Pão de Alho', 'Lanche especial no pão de alho', 14.00, 2),

-- Bebidas
(4, 'Água Mineral', 'Água mineral 500ml', 3.00, 1),
(4, 'Suco Natural', 'Suco natural da fruta', 6.00, 2),

-- Refrigerantes
(5, 'Coca-Cola', 'Coca-Cola 350ml', 5.00, 1),
(5, 'Guaraná', 'Guaraná Antarctica 350ml', 5.00, 2),
(5, 'Fanta', 'Fanta Laranja 350ml', 5.00, 3),

-- Cervejas
(6, 'Brahma', 'Brahma 350ml', 6.00, 1),
(6, 'Skol', 'Skol 350ml', 6.00, 2),
(6, 'Heineken', 'Heineken 350ml', 8.00, 3)
ON CONFLICT DO NOTHING;
