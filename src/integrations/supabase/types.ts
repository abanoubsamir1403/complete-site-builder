export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          target: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target?: string | null
        }
        Relationships: []
      }
      case_documents: {
        Row: {
          case_id: string
          created_at: string
          file_name: string | null
          file_path: string | null
          id: string
          label: string
          staff_note: string | null
          status: Database["public"]["Enums"]["doc_status"]
          uploaded_at: string | null
        }
        Insert: {
          case_id: string
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          label: string
          staff_note?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          uploaded_at?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          id?: string
          label?: string
          staff_note?: string | null
          status?: Database["public"]["Enums"]["doc_status"]
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_internal_notes: {
        Row: {
          author_id: string
          body: string
          case_id: string
          created_at: string
          id: string
        }
        Insert: {
          author_id?: string
          body: string
          case_id: string
          created_at?: string
          id?: string
        }
        Update: {
          author_id?: string
          body?: string
          case_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_internal_notes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_notices: {
        Row: {
          body: string
          case_id: string
          created_at: string
          id: string
          read_at: string | null
          title: string
        }
        Insert: {
          body: string
          case_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          title: string
        }
        Update: {
          body?: string
          case_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_notices_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          client_id: string
          created_at: string
          declaration: Json | null
          declaration_signed_at: string | null
          form_code: string | null
          id: string
          intake_answers: Json
          internal_note: string | null
          reference: string
          service_slug: string | null
          service_title: string
          signal: Database["public"]["Enums"]["case_signal"]
          stage: Database["public"]["Enums"]["case_stage"]
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          declaration?: Json | null
          declaration_signed_at?: string | null
          form_code?: string | null
          id?: string
          intake_answers?: Json
          internal_note?: string | null
          reference?: string
          service_slug?: string | null
          service_title: string
          signal?: Database["public"]["Enums"]["case_signal"]
          stage?: Database["public"]["Enums"]["case_stage"]
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          declaration?: Json | null
          declaration_signed_at?: string | null
          form_code?: string | null
          id?: string
          intake_answers?: Json
          internal_note?: string | null
          reference?: string
          service_slug?: string | null
          service_title?: string
          signal?: Database["public"]["Enums"]["case_signal"]
          stage?: Database["public"]["Enums"]["case_stage"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          disclaimer_accepted_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          preferred_lang: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          disclaimer_accepted_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferred_lang?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          disclaimer_accepted_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_lang?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          extra_clients: number
          extra_completed: number
          id: number
          show_on_home: boolean
          updated_at: string
          years_experience: number
        }
        Insert: {
          extra_clients?: number
          extra_completed?: number
          id?: number
          show_on_home?: boolean
          updated_at?: string
          years_experience?: number
        }
        Update: {
          extra_clients?: number
          extra_completed?: number
          id?: number
          show_on_home?: boolean
          updated_at?: string
          years_experience?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      public_stats: { Args: never; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "staff" | "client"
      case_signal: "green" | "yellow" | "red"
      case_stage:
        | "intake"
        | "documents"
        | "review"
        | "translation"
        | "assembly"
        | "complete"
      doc_status:
        | "requested"
        | "uploaded"
        | "under_review"
        | "accepted"
        | "needs_attention"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "client"],
      case_signal: ["green", "yellow", "red"],
      case_stage: [
        "intake",
        "documents",
        "review",
        "translation",
        "assembly",
        "complete",
      ],
      doc_status: [
        "requested",
        "uploaded",
        "under_review",
        "accepted",
        "needs_attention",
      ],
    },
  },
} as const
