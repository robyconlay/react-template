import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

import { Button } from '@/components/ui/button/button';
import { render, screen, userEvent, waitFor } from '@/testing/test-utils';

const openButtonText = 'Open Drawer';
const titleText = 'Drawer Title';
const cancelButtonText = 'Cancel';
const drawerContentText = 'Hello From Drawer';

const TestDrawer = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline">{openButtonText}</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{titleText}</DrawerTitle>
      </DrawerHeader>
      <div>{drawerContentText}</div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">{cancelButtonText}</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

test('opens and closes the drawer', async () => {
  render(<TestDrawer />);

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: openButtonText }));

  expect(await screen.findByText(titleText)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: cancelButtonText }));

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument(),
  );
});
