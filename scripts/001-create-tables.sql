-- Criar tabela de configurações
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  logo_url TEXT,
  whatsapp_number VARCHAR(20) DEFAULT '5511999999999',
  store_name VARCHAR(100) DEFAULT 'Espetinho do Sugano''s',
  store_description TEXT DEFAULT 'Os melhores espetinhos da região!',
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inserir configurações padrão
INSERT INTO settings (store_name, store_description, whatsapp_number) 
VALUES ('Espetinho do Sugano''s', 'Os melhores espetinhos da região!', '5511999999999')
ON CONFLICT DO NOTHING;

-- Inserir categorias padrão
INSERT INTO categories (name, description, display_order) VALUES
('Espetinhos', 'Deliciosos espetinhos grelhados na hora', 1),
('Pães', 'Pães de alho crocantes e saborosos', 2),
('Lanches', 'Lanches especiais da casa', 3),
('Bebidas', 'Bebidas geladas para acompanhar', 4),
('Refrigerantes', 'Refrigerantes diversos', 5),
('Cervejas', 'Cervejas geladas', 6)
ON CONFLICT DO NOTHING;
