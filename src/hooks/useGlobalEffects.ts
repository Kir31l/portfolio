import { useParticles } from './useParticles'
import { useCursorGlow } from './useCursorGlow'
import { useSectionGlow } from './useSectionGlow'
import { useClipboardCopy } from './useClipboardCopy'
import { usePageTransition } from './usePageTransition'
import { useScrollToTop } from './useScrollToTop'
import { useMobileSidebar } from './useMobileSidebar'
import { useEasterEgg } from './useEasterEgg'
import { useToggleFeedback } from './useToggleFeedback'
import { useServiceWorker } from './useServiceWorker'

/**
 * Composes all global app-wide effects into a single hook.
 * Call once at the App root instead of duplicating across every page.
 */
export function useGlobalEffects() {
  useParticles()
  useCursorGlow()
  useSectionGlow()
  useClipboardCopy()
  usePageTransition()
  useScrollToTop()
  useMobileSidebar()
  useEasterEgg()
  useToggleFeedback()
  useServiceWorker()
}
