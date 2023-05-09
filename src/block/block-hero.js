/**
 * BLOCK: mj-hero
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n

const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;

registerBlockType( 'mj-block/mj-hero', {
	title: __( 'MJ Hero Banner' ), // Block title.
	icon: 'format-image',
	category: 'common',
	
	attributes: {
	  title: {
		source: 'text',
		selector: '.hero__title'
	  },
	  body: {
		type: 'array',
		source: 'children',
		selector: '.hero__body'
	  },
	  imageAlt: {
		attribute: 'alt',
		selector: '.hero__image'
	  },
	  imageUrl: {
		attribute: 'src',
		selector: '.hero__image'
	  }
	},
	
	edit({ attributes, className, setAttributes }) {
		
		const getImageButton = (openEvent) => {
		  if(attributes.imageUrl) {
			return (
			  <img 
				src={ attributes.imageUrl }
				onClick={ openEvent }
				className="image"
			  />
			);
		  }
		  else {
			return (
			  <div className="button-container">
				<Button 
				  onClick={ openEvent }
				  className="button button-large"
				>
				  Pick an image
				</Button>
			  </div>
			);
		  }
		};
		
		return (
			<div className="container">
			  <MediaUpload
				onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
				type="image"
				value={ attributes.imageID }
				render={ ({ open }) => getImageButton(open) }
			  />
			  <PlainText
				onChange={ content => setAttributes({ title: content }) }
				value={ attributes.title }
				placeholder="Your Hero Banner title"
				className="heading"
			  />
			  <RichText
				onChange={ content => setAttributes({ body: content }) }
				value={ attributes.body }
				multiline="p"
				placeholder="Your Hero Banner text"
			  />
			</div>
		);
	},

	save({ attributes }) {
	  const cardImage = (src, alt) => {
		if(!src) return null;

		if(alt) {
		  return (
			<img 
			  className="card__image" 
			  src={ src }
			  alt={ alt }
			/> 
		  );
		}
		
		// No alt set, so let's hide it from screen readers
		return (
		  <img 
			className="card__image" 
			src={ src }
			alt=""
			aria-hidden="true"
		  /> 
		);
	  };
	  
	  return (
		<div className="card">
		  { cardImage(attributes.imageUrl, attributes.imageAlt) }
		  <div className="card__content">
			<h3 className="card__title">{ attributes.title }</h3>
			<div className="card__body">
			  { attributes.body }
			</div>
		  </div>
		</div>
	  );
	},
} );
