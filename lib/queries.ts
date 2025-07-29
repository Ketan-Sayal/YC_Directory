import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY=defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || category match $search || aurthor->name match $search || title match $search] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    aurthor->{_id, name, image, bio},
    views,
    description,
    category,
    image
}`); // $variable: external variable, match is for seaching a value in a string[don't worry about upper or lowercase]

export const STARTUP_BY_ID_QUERY= defineQuery(`*[_type=="startup" && _id==$id][0]{
  aurthor->{username, name, email, image, bio, _id},
  title,
  slug,
  views,
  description,
  category,
  image,
  pitch,
  _id,
  _createdAt
}`);

export const STARTUP_VIEWS_QUERY=defineQuery(`*[_type=="startup" && _id==$id][0]{
    _id, views
  }`);

export const GET_AURTHOR_BY_GITHUB_ID_QUERY=defineQuery(`*[_type=="aurthor" && id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }`);

export const GET_AURTHOR_BY_ID_QUERY=defineQuery(`*[_type=="aurthor" && _id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }`);

export const STARTUPS_BY_AURTHOR_QUERY=defineQuery(`*[_type=="startup" && aurthor._ref==$id] | order(_createdAt desc){
    _id,
    title,
    slug,
    _createdAt,
    aurthor->{_id, name, image, bio},
    views,
    description,
    category,
    image
}`); // $variable: external variable, match is for seaching a value in a string[don't worry about upper or lowercase]

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    aurthor->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
}
}`);