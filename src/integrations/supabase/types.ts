export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      jobs: {
        Row: {
          application_link: string | null
          category: Database["public"]["Enums"]["job_category"]
          company: string
          company_logo: string | null
          contact_email: string | null
          created_at: string
          description: string
          experience: Database["public"]["Enums"]["experience_level"]
          expires_at: string
          id: string
          location: string
          published: boolean
          salary_range: string | null
          skills: string[]
          title: string
          type: Database["public"]["Enums"]["job_type"]
          user_id: string
          verification_status: string
        }
        Insert: {
          application_link?: string | null
          category: Database["public"]["Enums"]["job_category"]
          company: string
          company_logo?: string | null
          contact_email?: string | null
          created_at?: string
          description: string
          experience: Database["public"]["Enums"]["experience_level"]
          expires_at?: string
          id?: string
          location: string
          published?: boolean
          salary_range?: string | null
          skills?: string[]
          title: string
          type: Database["public"]["Enums"]["job_type"]
          user_id: string
          verification_status?: string
        }
        Update: {
          application_link?: string | null
          category?: Database["public"]["Enums"]["job_category"]
          company?: string
          company_logo?: string | null
          contact_email?: string | null
          created_at?: string
          description?: string
          experience?: Database["public"]["Enums"]["experience_level"]
          expires_at?: string
          id?: string
          location?: string
          published?: boolean
          salary_range?: string | null
          skills?: string[]
          title?: string
          type?: Database["public"]["Enums"]["job_type"]
          user_id?: string
          verification_status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_logo: string | null
          company_name: string | null
          company_website: string | null
          created_at: string
          id: string
          is_admin: boolean
          is_trusted_poster: boolean
        }
        Insert: {
          company_logo?: string | null
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          id: string
          is_admin?: boolean
          is_trusted_poster?: boolean
        }
        Update: {
          company_logo?: string | null
          company_name?: string | null
          company_website?: string | null
          created_at?: string
          id?: string
          is_admin?: boolean
          is_trusted_poster?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      experience_level: "entry" | "mid" | "senior" | "lead"
      job_category:
        | "blockchain-development"
        | "smart-contracts"
        | "frontend"
        | "backend"
        | "design"
        | "product"
        | "marketing"
        | "business"
        | "legal"
        | "community"
        | "other"
      job_type: "full-time" | "freelance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      experience_level: ["entry", "mid", "senior", "lead"],
      job_category: [
        "blockchain-development",
        "smart-contracts",
        "frontend",
        "backend",
        "design",
        "product",
        "marketing",
        "business",
        "legal",
        "community",
        "other",
      ],
      job_type: ["full-time", "freelance"],
    },
  },
} as const
