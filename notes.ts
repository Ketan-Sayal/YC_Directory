// *[_type=="aurthor" && username=="Ketan Sayal"]{username, _id, email, image}
// *[_type=="startup"]{"aurthorDetails":aurthor->{username, email}, category, description, slug, title}[0]
/** 
 * "*" means everything
 * [] brackets mei kya  chahiye
 * _type[it is a proverty] == "value"
 * you can also use "->" for expanding the properties of a ref  object
 * Rest is eaasy use propertyname[] for Arrays 
 * If you want things in orfder just use "*[property==value] | order(property)", "*[property==value] | order(property desc)" for decending
 * defined(slug.current) gives only if value of slug.current is defined.
 * */


// *[_type=="startup" && defined(slug.current) && !defined($search) || category match $search || aurthor->name match $search || title match $search]
//// $variable: external variable, match is for seaching a value in a string[don't worry about upper or lowercase]