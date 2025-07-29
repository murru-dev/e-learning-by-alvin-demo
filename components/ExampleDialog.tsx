import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from './ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';

// Example 1: Using traditional DialogHeader with explicit title and description
export function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Traditional Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Example Dialog</DialogTitle>
          <DialogDescription>
            This is an example dialog that demonstrates proper accessibility implementation
            with DialogTitle and DialogDescription components.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>This dialog content is properly structured for accessibility.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 2: Using new simplified approach with title and description props
export function ExampleDialogSimplified() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Simplified Dialog</Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[425px]"
        title="Simplified Dialog"
        description="This dialog uses the simplified approach with title and description props for accessibility."
      >
        <div className="py-4">
          <p>This dialog automatically includes accessible title and description.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 3: Dialog with hidden title and description (automatically added for accessibility)
export function ExampleDialogWithAutoAccessibility() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Auto-Accessible Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Custom Content</h3>
          <p>This dialog automatically includes hidden title and description for accessibility, even without explicit props.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 4: Dialog with only title visible
export function ExampleDialogWithVisibleTitle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog with Visible Title</Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[425px]"
        title="Visible Title Only"
      >
        <div className="py-4">
          <p>This dialog has a visible title but hidden description for accessibility.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 5: Using VisuallyHidden wrapper as recommended by Radix UI
export function ExampleDialogWithVisuallyHidden() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog with VisuallyHidden</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Hidden but Accessible Title</DialogTitle>
          </VisuallyHidden>
          <DialogDescription>
            This dialog uses VisuallyHidden component to wrap the title as recommended by Radix UI.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Visible Content Title</h3>
          <p>The actual title is hidden but accessible to screen readers using VisuallyHidden.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 6: Testing if automatic accessibility works
export function ExampleDialogAutomatic() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Test Automatic Accessibility</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">No Explicit Title/Description</h3>
          <p>This dialog should automatically get hidden title and description for accessibility.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Example 7: Testing Sheet accessibility
export function ExampleSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet (Fixed)</Button>
      </SheetTrigger>
      <SheetContent title="Accessible Sheet" description="This sheet has proper accessibility">
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Sheet Content</h3>
          <p>This sheet now has automatic title and description for accessibility.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}