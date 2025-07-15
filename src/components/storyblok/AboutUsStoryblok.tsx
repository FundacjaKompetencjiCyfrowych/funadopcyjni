import { storyblokEditable } from '@storyblok/react/rsc';
import AboutUs from '@/components/organisms/AboutUs/AboutUs';

interface AboutUsStoryblokProps {
  blok: {
    _uid: string;
    title: string;
    description: string;
    image: {
      filename: string;
      alt?: string;
    };
  };
}

const AboutUsStoryblok = ({ blok }: AboutUsStoryblokProps) => {
  return <AboutUs blok={blok} {...storyblokEditable(blok)} />;
};

export default AboutUsStoryblok;
