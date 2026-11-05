import type { NavigationItem } from '@/types';

export const mainNavigation: NavigationItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Ferramentas', href: '/ferramentas/' },
  {
    label: 'Nutrição',
    href: '/nutricao/',
    children: [
      { label: 'Calculadora de Proteínas', href: '/ferramentas/calculadora-proteina/' },
      { label: 'Calculadora de Calorias', href: '/ferramentas/calculadora-calorias/' },
      { label: 'Fontes de Proteína', href: '/nutricao/fontes-proteina/' },
    ],
  },
  {
    label: 'Treinamento',
    href: '/treinamento/',
    children: [
      { label: 'Calculadora de Volume', href: '/ferramentas/calculadora-volume/' },
      { label: 'Guia de Exercícios', href: '/treinamento/exercicios/' },
    ],
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Sobre', href: '/sobre/' },
];

export const footerNavigation = {
  institucional: [
    { label: 'Sobre', href: '/sobre/' },
    { label: 'Contato', href: '/contato/' },
    { label: 'Política de Privacidade', href: '/privacidade/' },
    { label: 'Termos de Uso', href: '/termos/' },
  ],
  ferramentas: [
    { label: 'Calculadora de Proteínas', href: '/ferramentas/calculadora-proteina/' },
    { label: 'Calculadora de IMC', href: '/ferramentas/calculadora-imc/' },
    { label: 'Calculadora de Calorias', href: '/ferramentas/calculadora-calorias/' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/fittool.app', external: true },
    { label: 'YouTube', href: 'https://youtube.com/@fittool.app.channel', external: true },
  ],
};

export const socialLinks = {
  instagram: 'https://instagram.com/fittool.app',
  youtube: 'https://youtube.com/@fittool.app.channel',
};
