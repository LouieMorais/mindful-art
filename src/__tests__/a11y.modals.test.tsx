// src/__tests__/a11y.modals.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';
import CreateGalleryModal from '../components/modals/CreateGalleryModal';
import SaveToGalleryModal from '../components/modals/SaveToGalleryModal';
import type { Artwork } from '../types/artwork';

// Extend Jest with the matcher and type it
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}
expect.extend({ toHaveNoViolations });

const sample: Artwork = {
  id: 'harvard:1',
  title: 'Sample',
  artist: 'Unknown',
  imageUrl: null,
  objectUrl: null,
  institution: 'Harvard Art Museums',
  source: 'harvard',
  year: 'n.d.',
};

describe('Accessibility — Modals', () => {
  test('CreateGalleryModal is accessible', async () => {
    const { container } = render(<CreateGalleryModal onClose={() => {}} />);
    const results = (await axe(container)) as AxeResults;
    expect(results).toHaveNoViolations();
  });

  test('SaveToGalleryModal is accessible', async () => {
    const { container } = render(<SaveToGalleryModal artwork={sample} onClose={() => {}} />);
    const results = (await axe(container)) as AxeResults;
    expect(results).toHaveNoViolations();
  });
});
