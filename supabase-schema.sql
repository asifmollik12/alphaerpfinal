-- Example schema for your ERP system
-- Run this in Supabase SQL Editor: https://pftnfyqulmwhmlnwvdel.supabase.co

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (example)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  company_id UUID,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Companies table (for multi-tenant SaaS)
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Modules table (ERP modules)
CREATE TABLE IF NOT EXISTS modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Company modules (which modules each company has access to)
CREATE TABLE IF NOT EXISTS company_modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(company_id, module_id)
);

-- Add foreign key for users
ALTER TABLE users 
ADD CONSTRAINT fk_company 
FOREIGN KEY (company_id) 
REFERENCES companies(id) ON DELETE SET NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_modules ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (customize based on your needs)
-- Allow users to read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Allow authenticated users to view companies
CREATE POLICY "Authenticated users can view companies" ON companies
  FOR SELECT TO authenticated USING (true);

-- Allow all users to view active modules
CREATE POLICY "Anyone can view active modules" ON modules
  FOR SELECT USING (is_active = true);

-- Insert sample modules
INSERT INTO modules (name, description, icon) VALUES
  ('Dashboard', 'Main dashboard with analytics', 'LayoutDashboard'),
  ('CRM', 'Customer Relationship Management', 'Users'),
  ('HRM', 'Human Resource Management', 'UserCheck'),
  ('Accounting', 'Financial accounting module', 'Calculator'),
  ('Inventory', 'Inventory management', 'Package'),
  ('Sales', 'Sales and orders management', 'ShoppingCart'),
  ('Projects', 'Project management', 'FolderKanban'),
  ('Reports', 'Reports and analytics', 'BarChart')
ON CONFLICT DO NOTHING;
