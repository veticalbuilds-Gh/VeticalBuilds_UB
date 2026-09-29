import { defineField, defineType, defineArrayMember } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Project Name', type: 'string' }),
    defineField({ 
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'name' } 
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'type', title: 'Project Type', type: 'string' }),
    defineField({ name: 'status', title: 'Status', type: 'string' }),
    defineField({ name: 'price', title: 'Starting Price', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
    defineField({ name: 'metaDescription', title: 'SEO Meta Description', type: 'text' }),
    defineField({ name: 'projectSpecs', title: 'Project Specs', type: 'text' }),
    
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'brochure', title: 'Brochure PDF', type: 'file' }),
    
    defineField({ 
      name: 'amenities', 
      title: 'Amenities', 
      type: 'array', 
      of: [defineArrayMember({ type: 'string' })] 
    }),
    
    defineField({ name: 'galleryOverview', title: 'Gallery Overview Text', type: 'text' }),
    
    defineField({ 
      name: 'floorPlans', 
      title: 'Floor Plans', 
      type: 'array', 
      of: [
        defineArrayMember({ 
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image' })
          ]
        })
      ] 
    }),
    
    defineField({ 
      name: 'video', 
      title: 'Cinematic Walkthrough Video (Short Clip)', 
      type: 'file',
      options: { accept: 'video/*' }
    }),
    
    defineField({ 
      name: 'galleryImages', 
      title: 'Gallery Images', 
      type: 'array', 
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] 
    })
  ]
})
