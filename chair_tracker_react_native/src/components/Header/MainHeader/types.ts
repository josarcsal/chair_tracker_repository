export type Props = {
  title: string;
  subtitle?: string;
  handleAdd?: () => void;
  refetch?: () => Promise<void>;
};
