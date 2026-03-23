import {
  Configure,
  Highlight,
  Hits,
  Pagination,
  RefinementList,
  DynamicWidgets,
  HierarchicalMenu,
  RangeInput,
} from 'react-instantsearch';

import { ALGOLIA_INDEX_NAME } from '../config/algolia';
import { ChatWithRefineTool } from '../components/Chat';
import { Panel } from '../components/Panel';
import type { Hit } from 'instantsearch.js';

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AISearchSummary } from '../components/AiSearchSummary';



export default function SearchPage() {
  const { category } = useParams<{ category: string }>();
  console.log('Category ID from params:', category);
  
  // Create filter for categoryPageId, properly escaping the value
  const getCategoryFilter = (cat: string | undefined) => {
    if (!cat) return undefined;
    
    const decodedCat = decodeURIComponent(cat);
    // Escape quotes in the category value and wrap in quotes
    const escapedCategory = decodedCat.replace(/"/g, '\\"');
    
    return `categoryPageId:"${escapedCategory}"`;
  };
  
  const categoryFilter = getCategoryFilter(category);
  console.log('Category filter:', categoryFilter);
  
  return (
    <div className="min-h-screen bg-neutral-50">

      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <Configure hitsPerPage={12} filters={categoryFilter} />
       

          <div className="flex gap-12">
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-8 space-y-8">
                <DynamicWidgets facets={["*"]} maxValuesPerFacet={1000}>
                  <Panel header="Categories">
                    <HierarchicalMenu attributes={[
                      "hierarchical_categories.lvl0",
                      "hierarchical_categories.lvl1",
                      "hierarchical_categories.lvl2",
                    ]} />
                  </Panel>
                  <Panel header="BRAND">
                    <RefinementList attribute="brand" />
                  </Panel>
                  <Panel header="SIZE">
                    <RefinementList attribute="available_sizes" />
                  </Panel>
                   <Panel header="COLOR">
                    <RefinementList attribute="color.original_name" />
                  </Panel>
                   <Panel header="PRICE">
                    <RangeInput attribute="price.value" />
                  </Panel>
                   <Panel header="RATING">
                    <RefinementList attribute="rating" />
                  </Panel>
                  <Panel header="TYPE">
                    <RefinementList attribute="gender" />
                  </Panel>
                  <Panel header="GENDER">
                    <RefinementList attribute="gender" />
                  </Panel>
                </DynamicWidgets>
              </div>
            </aside>

            <div className="flex-1">
              {/* AI Search Summary- WIP */}
              {/* <AISearchSummary /> */}
              
              <Hits 
                hitComponent={ProductCard}
                classNames={{
                  root: 'mb-16',
                  list: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8',
                  item: '',
                }}
              />

              <div className="flex justify-center">
                <Pagination 
                  classNames={{
                    root: 'flex gap-2',
                    list: 'flex gap-2',
                    item: 'min-w-[40px] h-[40px]',
                    link: 'flex items-center justify-center w-full h-full border border-neutral-300 hover:bg-black hover:text-white hover:border-black transition-colors text-sm',
                    selectedItem: 'bg-black text-white border-black',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

type HitProps = {
  hit: Hit;
};

function trackQueryId(hit: Hit) { 
  if (hit.__queryID) {
    try {
      const clickedItems = localStorage.getItem('clickedItems');
      const clicked = clickedItems ? JSON.parse(clickedItems) : {};
      
      // Map objectID directly to most recent queryID
      clicked[hit.objectID] = hit.__queryID;
      
      localStorage.setItem('clickedItems', JSON.stringify(clicked));
    } catch (error) {
      console.error('Error updating clicked items:', error);
    }
  }
}

function ProductCard({ hit }: HitProps) {
  console.log('Rendering hit:', hit);
  
  return (
    <Link 
      to={`/product/${hit.objectID}`} 
      state={{ product: hit }}
      className="group cursor-pointer block"
      onClick={() => trackQueryId(hit)}
    >
      <div className="relative aspect-[3/4] bg-neutral-100 mb-4 overflow-hidden">
        <img 
          src={hit.primary_image}
          alt={hit.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xs tracking-widest text-neutral-500 uppercase">
          {hit.brand}
        </h3>
        <h2 className="text-base font-light leading-tight">
          <Highlight attribute="name" hit={hit} />
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-light">${hit.price.value}</span>
        </div>
      </div>
    </Link>
  );
}