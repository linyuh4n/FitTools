import type { SEOProps } from '@/types';

export const DEFAULT_SEO: SEOProps = {
  title: 'FitTools - Ferramentas Gratuitas para Fitness e Nutrição',
  description:
    'Calculadoras gratuitas de proteína, IMC, calorias e mais. Ferramentas baseadas em ciência para sua evolução fitness. Sem cadastro, privacidade garantida.',
  canonical: 'https://fittools.com.br',
  ogImage: '/social/og-default.svg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

export function generateSEO(props: Partial<SEOProps>): SEOProps {
  return {
    ...DEFAULT_SEO,
    ...props,
    canonical: props.canonical
      ? `${DEFAULT_SEO.canonical}${props.canonical.startsWith('/') ? '' : '/'}${props.canonical}`
      : DEFAULT_SEO.canonical,
    ogImage: props.ogImage || DEFAULT_SEO.ogImage,
  };
}

export function generateArticleJsonLd(props: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  publisherName: string;
  publisherLogo: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    image: props.image,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    author: {
      '@type': 'Person',
      name: props.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: props.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: props.publisherLogo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

export function generateWebSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FitTools',
    url: 'https://fittools.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://fittools.com.br/busca?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FitTools',
    url: 'https://fittools.com.br',
    logo: 'https://fittools.com.br/favicon.svg',
    sameAs: [
      'https://instagram.com/fittools',
      'https://youtube.com/@fittools',
    ],
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCalculatorJsonLd(props: {
  name: string;
  description: string;
  url: string;
  category: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    },
    name: props.name,
    description: props.description,
    url: props.url,
    category: props.category,
  };
}
