import { formatDate } from '@/lib/utils'
import { Aurthor, Startup } from '@/sanity/types'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type StartupTypeCard = Omit<Startup, "aurthor">& {aurthor?:Aurthor}

const StartupCard = ({post}:{post:StartupTypeCard}) => {

    const {_createdAt, views, aurthor, title, category, _id, image, description} = post;

  return (
    <li className='startup-card group'>
      <div className='flex-between'>
        <p className='startup_card_date'>{formatDate(_createdAt)}</p>
      </div>
      <div className='flex gap-1.5'>
        <EyeIcon className='size-6 text-primary'/>
        <span className='text-16-medium'>{views}</span>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className="flex-1">
            <Link href={`/user/${aurthor?._id}`}>
                <p className="text-16-medium line-clamp-1">{aurthor?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
                <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
            </Link>
        </div>
        <Link href={`/user/${aurthor?._id}`}>
                <Image src={aurthor?.image||"https://placehold.co/48x48"} alt='placeholder' width={48} height={48} className='rounded-full'/>{/**for optimization */}
            </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <img src={image} alt='placeholder' className='startup-card_img' />
      </Link>
      <div className='flex-between mt-5 gap-3'>
        <Link href={`/?query=${category?.toLocaleLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <button className='startup-card_btn'>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </button>
      </div>
    </li>
  )
}

export default StartupCard;
