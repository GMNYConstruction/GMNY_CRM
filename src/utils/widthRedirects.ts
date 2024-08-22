"use client"; 

export const widthRedirects = (to: string, minWidth = 740) => {
if(typeof window !== 'undefined') { 
  if(window.innerWidth <= minWidth) return window.location.replace(to)
}

}