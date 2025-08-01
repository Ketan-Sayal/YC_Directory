import React from 'react'
import Form from "next/form";
import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query}:{query?: string}) => {
    // const query = "Test";

  return (
    <Form action={"/"} scroll={false} className='search-form'>{/**Submit a data and it iss a server part */}
      <input 
      type="text" 
      name='query'
      defaultValue={query}
      className='search-input'
      placeholder='Search Startups'
      />
      <div className='flex gap-2'>
        {query && <SearchFormReset/>}
        <button
        type='submit'
        className='search-btn text-white'
        >
        <Search className='size-5'/>
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
